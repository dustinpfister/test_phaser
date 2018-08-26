

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('basics-1', {

    create: function () {

        // creating two groups
        var group1 = game.add.group(),
        group2 = game.add.group();

        // anding a bunch of text objects to group 1
        var i = 5;
        while (i--) {
            group1.add(game.add.text(0, i * 20, 'foo' + i, {
                    fill: 'red'
                }));
        }

        // child length of both groups is as expected
        console.log(group1.children.length); // 5
        console.log(group2.children.length); // 0

        // grabbing a reference to the third child
        // in group1
        var text = group1.children[2];

        // removing the text object from group one
        // but the text object will not be destroyed
        group1.remove(text, false, false);

        // adding the text object to group2
        group2.add(text);

        // child length of both groups is as expected
        console.log(group1.children.length); // 4
        console.log(group2.children.length); // 1

        // if I have a reference I can really destroy
        // the object this way
        text.destroy();

        // child length of group2 is as expected
        console.log(group2.children.length); // 0

        // I can also destroy objects by passing true
        // as the second argument when calling Group.remove
        group1.remove(group1.children[0], true);

        // child length of group1 is as expected
        console.log(group1.children.length); // 3

    }

});

game.state.start('basics-1');
