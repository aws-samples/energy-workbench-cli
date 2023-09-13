import {expect, test} from '@oclif/test'

describe('hellohi', () => {
  test
  .stdout()
  .command(['hellohi'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['hellohi', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
