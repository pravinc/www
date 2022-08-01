// https://ui.dev/shorthand-properties

{
    function formatMessage(name, id, avatar) {
        return {
            name: name,
            id: id,
            avatar: avatar,
            timestamp: Date.now(),
            save: function () {
                // save message
            }
        }
    }
}

{
    function formatMessage(name, id, avatar) {
        return {
            // shorthand properties
            name,
            id,
            avatar,

            timestamp: Date.now(),

            // shorthand method names
            save() {
                //save message
            }
        }
    }
}
