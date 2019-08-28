module.exports = {
    pluginOptions: {
        electronBuilder: {
            mainProcessTypeChecking: false,
            builderOptions: {
                appId: 'socketdude',
                linux: {
                    icon: 'src/assets/socket_dude_logo.png',
                    category: 'Development;Utility',
                    desktop: {
                        'Name': 'SocketDude',
                        'StartupWMClass': 'socketdude'
                    },
                    target: [
                        'tar.xz',
                        'pacman',
                    ]
                },
                win: {
                    icon: 'src/assets/socket_dude_logo.png',
                }
            }
        }
    }
}
