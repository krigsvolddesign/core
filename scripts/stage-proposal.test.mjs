import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('staging workflow is manual, enabled, gated and staged-only',async()=>{
 const text=await readFile('.github/workflows/core-stage.yml','utf8');
 assert.match(text,/\non:\n  workflow_dispatch:\n/);
 assert.doesNotMatch(text,/^  (push|pull_request|release|schedule|workflow_call):/m);
 assert.doesNotMatch(text,/^    if:/m);
 assert.match(text,/environment:\s*core-stage-review/);
 assert.match(text,/id-token:\s*write/);
 assert.match(text,/npm stage publish/);
 assert.doesNotMatch(text,/\bnpm publish\b/);
 assert.match(text,/git merge-base --is-ancestor HEAD origin\/main/);
 assert.match(text,/sha256sum --check/);
 assert.ok(text.includes('test "$EXPECTED_SHA256" = "c2088b2585e913c11f74a045805bcef186e8e830f5c626e46c0c299e6a6eb7c4"'));
 assert.match(text,/test \"\$GITHUB_REF\" = \"refs\/heads\/main\"/);
 assert.match(text,/test \"\$APPROVED_SHA\" = \"\$GITHUB_SHA\"/);
 assert.match(text,/pkg\.private|v\.private/);
});

test('legacy release-event direct publication is absent',async()=>{
 await assert.rejects(readFile('.github/workflows/publish.yml','utf8'),{code:'ENOENT'});
});
