import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('test:list', () => {
  it('runs test:list cmd', async () => {
    const {stdout} = await runCommand('test:list')
    expect(stdout).to.contain('hello world')
  })

  it('runs test:list --name oclif', async () => {
    const {stdout} = await runCommand('test:list --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
