import {expect, test} from '@oclif/test'

describe('setup/templates', () => {
  test
  .stdout()
  .command(['setup/templates'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['setup/templates', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
