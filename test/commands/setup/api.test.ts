import {expect, test} from '@oclif/test'

describe('setup/api', () => {
  test
  .stdout()
  .command(['setup/api'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['setup/api', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
