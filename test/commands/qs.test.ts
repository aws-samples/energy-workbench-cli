import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('qs', () => {
  it('runs qs cmd', async () => {
    const {stdout} = await runCommand('qs')
    expect(stdout).to.contain('hello world')
  })

  it('runs qs --name oclif', async () => {
    const {stdout} = await runCommand('qs --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
