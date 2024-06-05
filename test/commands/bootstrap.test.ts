import {expect, test} from '@oclif/test'

describe('bootstrap', () => {
  test
  .stdout()
  .command(['bootstrap'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['bootstrap', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
