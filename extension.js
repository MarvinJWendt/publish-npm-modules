const vscode = require('vscode')
const child_process = require('child_process')

function activate(context) {
  console.log('Congratulations, your extension "publish-npm-modules" is now active!')

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let PUBLISH_PATCH = vscode.commands.registerCommand('publish-npm-module.patch', () => publishModule('patch'))

  let PUBLISH_MINOR = vscode.commands.registerCommand('publish-npm-module.minor', () => publishModule('minor'))

  let PUBLISH_MAJOR = vscode.commands.registerCommand('publish-npm-module.major', () => publishModule('major'))

  // With GIT support
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

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate


const publishModule = (level, git = false) => {
  try {

    const terminal = vscode.window.createTerminal(`Publishing module..`);
    terminal.show()
    terminal.sendText(`npm version ${level}`);
    terminal.sendText('npm publish')

    if(git)
      terminal.sendText('git push --follow-tags')

    //terminal.dispose()

  } catch (err) {
    console.log(err)
    throw err
  }
}