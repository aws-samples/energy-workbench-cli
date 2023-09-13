import {expect, test} from '@oclif/test'

describe('deploy/application', () => {
  test
  .stdout()
  .command(['deploy/application'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['deploy/application', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
