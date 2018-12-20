const vscode = require('vscode')

function activate(context) {

  // Version the module
  let PUBLISH_PATCH = vscode.commands.registerCommand('publish-npm-module.patch', () => publishModule('patch'))
  let PUBLISH_MINOR = vscode.commands.registerCommand('publish-npm-module.minor', () => publishModule('minor'))
  let PUBLISH_MAJOR = vscode.commands.registerCommand('publish-npm-module.major', () => publishModule('major'))

  // Version the module with GIT support
  let PUBLISH_PATCH_WITH_GIT = vscode.commands.registerCommand('publish-npm-module.withGit.patch', () => publishModule('patch', true))
  let PUBLISH_MINOR_WITH_GIT = vscode.commands.registerCommand('publish-npm-module.withGit.minor', () => publishModule('minor', true))
  let PUBLISH_MAJOR_WITH_GIT = vscode.commands.registerCommand('publish-npm-module.withGit.major', () => publishModule('major', true))

  context.subscriptions.push(PUBLISH_PATCH)
  context.subscriptions.push(PUBLISH_MINOR)
  context.subscriptions.push(PUBLISH_MAJOR)

  context.subscriptions.push(PUBLISH_PATCH_WITH_GIT)
  context.subscriptions.push(PUBLISH_MINOR_WITH_GIT)
  context.subscriptions.push(PUBLISH_MAJOR_WITH_GIT)
}

exports.activate = activate

function deactivate() {}
exports.deactivate = deactivate

const publishModule = (level, git = false) => {
  try {
    const terminal = vscode.window.createTerminal(`Publishing module..`)
    terminal.show()
    terminal.sendText(`npm version ${level}`)
    terminal.sendText('npm publish')

    if (git) terminal.sendText('git push --follow-tags')

  } catch (err) {
    console.log(err)
    throw err
  }
}
