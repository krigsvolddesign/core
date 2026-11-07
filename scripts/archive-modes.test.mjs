import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,readFile,stat,rm} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

// Exercise both actual extraction paths, including the restrictive tag-job umask.
test('staging and tag archives preserve Git modes and package bytes under either umask',async()=>{
 const temp=await mkdtemp(join(tmpdir(),'core-archive-modes-'));
 const fixture=join(temp,'fixture');await mkdir(fixture);
 const git=(...args)=>execFileSync('git',args,{cwd:fixture,stdio:['ignore','pipe','pipe'],timeout:30000});
 try{
  await mkdir(join(fixture,'dist'));
  const files={'package.json':JSON.stringify({name:'core-archive-mode-fixture',version:'1.0.0',private:false,files:['dist','README.md','LICENSE']},null,2)+'\n','README.md':'Archive fixture.\n','LICENSE':'MIT\n','dist/index.js':'export const value=1;\n'};
  for(const [path,body] of Object.entries(files))await writeFile(join(fixture,path),body,{mode:0o644});
  git('init','-b','main');git('config','tar.umask','0022');git('config','user.name','Archive fixture');git('config','user.email','archive@example.invalid');git('add','.');git('commit','-m','fixture');
  const archived=join(temp,'source.tar');await writeFile(archived,git('archive','HEAD'));
  const workflow=await readFile('.github/workflows/tag-release.yml','utf8');assert.match(workflow,/umask 077/);
  const extraction=workflow.split('\n').map(x=>x.trim()).find(x=>x.startsWith('git archive HEAD | tar '));assert.ok(extraction);
  const helper=new URL('./stage-core.mjs',import.meta.url).href;
  let first;
  for(const path of ['stage','tag'])for(const mask of [0o022,0o077]){
   const run=join(temp,`${path}-${mask.toString(8)}`),source=join(run,'core-src');await mkdir(source,{recursive:true});
   const code=`import {extractSource} from ${JSON.stringify(helper)};import{readFileSync}from'node:fs';import{execFileSync}from'node:child_process';process.umask(${mask});${path==='stage'?`extractSource(readFileSync(${JSON.stringify(archived)}),${JSON.stringify(source)});`:`execFileSync('bash',['-c',${JSON.stringify(extraction)}],{cwd:${JSON.stringify(fixture)},env:{...process.env,RUNNER_TEMP:${JSON.stringify(run)}},timeout:30000});`}execFileSync('npm',['pack','--ignore-scripts','--json','--pack-destination',${JSON.stringify(run)}],{cwd:${JSON.stringify(source)},timeout:30000,stdio:'pipe'});`;
   execFileSync(process.execPath,['--input-type=module','-e',code],{timeout:60000,stdio:'pipe'});
   for(const [file,body] of Object.entries(files)){assert.equal((await stat(join(source,file))).mode&0o777,0o644,`${path} ${mask.toString(8)} ${file}`);assert.equal(await readFile(join(source,file),'utf8'),body);}
   const archive=await readFile(join(run,'core-archive-mode-fixture-1.0.0.tgz'));if(first)assert.deepEqual(archive,first,'Package bytes changed with extraction path or umask');else first=archive;
  }
 }finally{await rm(temp,{recursive:true,force:true});}
});
