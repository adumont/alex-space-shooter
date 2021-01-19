namespace SpriteKind {
    export const Fuel = SpriteKind.create()
    export const Life = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        3 3 3 3 3 3 3 3 
        3 . . . . . . 3 
        3 . 3 3 3 3 . 3 
        3 . 3 . . 3 . 3 
        3 . 3 . . 3 . 3 
        3 . 3 3 3 3 . 3 
        3 . . . . . . 3 
        3 3 3 3 3 3 3 3 
        `, mySprite, 0, -70)
    projectile.startEffect(effects.ashes)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Fuel, function (sprite, otherSprite) {
    statusbar.value = 100
    otherSprite.destroy(effects.halo, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Life, function (sprite, otherSprite) {
    if (info.life() < 5) {
        info.changeLifeBy(1)
        otherSprite.destroy(effects.halo, 100)
    }
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy(effects.bubbles, 500)
    otherSprite.destroy(effects.smiles, 500)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.disintegrate, 500)
})
let Fuel: Sprite = null
let Heart: Sprite = null
let myEnemy: Sprite = null
let projectile: Sprite = null
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . 9 9 . . . . . . . 
    . . . . . . 9 . . 9 . . . . . . 
    . . . . . . 9 . . 9 . . . . . . 
    . . . . . 9 . 9 9 . 9 . . . . . 
    . . . . . 9 . 9 9 . 9 . . . . . 
    . . . . 9 . 9 9 9 9 . 9 . . . . 
    . . . . 9 . 9 9 9 9 . 9 . . . . 
    . . . 9 . 9 9 9 9 9 9 . 9 . . . 
    . . . 9 . 9 . . . . 9 . 9 . . . 
    . . 9 . 9 9 . 9 9 . 9 9 . 9 . . 
    . . 9 . 9 9 . . . . 9 9 . 9 . . 
    . 9 . 9 9 9 . 9 9 9 9 9 9 . 9 . 
    . 9 . 9 9 9 . 9 9 9 9 9 9 . 9 . 
    9 . 9 9 9 9 9 9 9 9 9 9 9 9 . 9 
    9 . . . . . . . . . . . . . . 9 
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -22, 0)
let timeEnemy = 1000
mySprite.y = 100
game.onUpdateInterval(750, function () {
    myEnemy = sprites.createProjectileFromSide(img`
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 . . . . . . . . . . . . . . 2 
        2 . 2 2 2 2 2 2 2 2 2 2 2 2 . 2 
        . 2 . 2 2 2 . . . . 2 2 2 . 2 . 
        . 2 . 2 2 2 . 2 2 2 2 2 2 . 2 . 
        . . 2 . 2 2 . . . 2 2 2 . 2 . . 
        . . 2 . 2 2 . 2 2 2 2 2 . 2 . . 
        . . . 2 . 2 . . . . 2 . 2 . . . 
        . . . 2 . 2 2 2 2 2 2 . 2 . . . 
        . . . . 2 . 2 2 2 2 . 2 . . . . 
        . . . . 2 . 2 2 2 2 . 2 . . . . 
        . . . . . 2 . 2 2 . 2 . . . . . 
        . . . . . 2 . 2 2 . 2 . . . . . 
        . . . . . . 2 . . 2 . . . . . . 
        . . . . . . 2 . . 2 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        `, 0, randint(5, 20))
    myEnemy.x = randint(5, 155)
    myEnemy.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(20000, function () {
    if (info.life() < 5) {
        Heart = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . 3 3 3 3 . . . . 3 3 3 3 . . 
            . 3 3 3 3 3 3 . . 3 3 3 3 3 3 . 
            . 3 3 3 3 3 3 3 . 3 3 3 3 3 3 . 
            . 3 3 3 3 3 3 3 3 3 3 3 3 3 3 . 
            . 3 3 3 3 3 3 3 3 3 3 3 3 3 3 . 
            . . 3 3 3 3 3 3 3 3 3 3 3 3 . . 
            . . . 3 3 3 3 3 3 3 3 3 3 3 . . 
            . . . . 3 3 3 3 3 3 3 3 3 . . . 
            . . . . . 3 3 3 3 3 3 3 . . . . 
            . . . . . . 3 3 3 3 3 3 . . . . 
            . . . . . . . 3 3 3 3 . . . . . 
            . . . . . . . . 3 3 . . . . . . 
            . . . . . . . . 3 . . . . . . . 
            `, 0, 40)
        Heart.x = randint(5, 155)
        Heart.setKind(SpriteKind.Life)
    }
})
game.onUpdateInterval(200, function () {
    statusbar.value += -1
})
game.onUpdateInterval(10000, function () {
    Fuel = sprites.createProjectileFromSide(img`
        . . . . . . . e c 7 . . . . . . 
        . . . . e e e c 7 7 e e . . . . 
        . . c e e e e c 7 e 2 2 e e . . 
        . c e e e e e c 6 e e 2 2 2 e . 
        . c e e e 2 e c c 2 4 5 4 2 e . 
        c e e e 2 2 2 2 2 2 4 5 5 2 2 e 
        c e e 2 2 2 2 2 2 2 2 4 4 2 2 e 
        c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
        c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
        c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
        c e e 2 2 2 2 2 2 2 2 2 2 4 2 e 
        . e e e 2 2 2 2 2 2 2 2 2 4 e . 
        . 2 e e 2 2 2 2 2 2 2 2 4 2 e . 
        . . 2 e e 2 2 2 2 2 4 4 2 e . . 
        . . . 2 2 e e 4 4 4 2 e e . . . 
        . . . . . 2 2 e e e e . . . . . 
        `, 0, 40)
    Fuel.x = randint(5, 155)
    Fuel.setKind(SpriteKind.Fuel)
})
