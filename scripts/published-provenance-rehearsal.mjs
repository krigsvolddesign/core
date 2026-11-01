import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {verifyProvenance} from './tag-release-guard.mjs';
const audit=JSON.parse(await readFile(process.argv[2],'utf8')),archive=await readFile(process.argv[3]);
if(createHash('sha256').update(archive).digest('hex')!=='c2088b2585e913c11f74a045805bcef186e8e830f5c626e46c0c299e6a6eb7c4')throw Error('Published tarball differs from reviewed bytes');
if(!verifyProvenance({audit,archive,name:'@krigsvold/core',version:'2.2.4',repository:'krigsvolddesign/core',tag:'unused',commit:'d7b6c2c9d09aa4b82f24dfc84a751c0946fa458a',expectedWorkflow:'.github/workflows/core-stage.yml',expectedRef:'refs/heads/main',expectedEvent:'workflow_dispatch'}))throw Error('Verified existing provenance identity mismatch');
console.log('Published archive and supplied verified-audit provenance match the recorded source');
