import {expect, test} from '@oclif/test'

describe('data/ge', () => {
  test
  .stdout()
  .command(['data/ge'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['data/ge', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
