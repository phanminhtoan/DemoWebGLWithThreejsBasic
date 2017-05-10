export class Marine
{
    constructor (container, model, resolve)
    {
        this.mesh = new THREE.BlendCharacter()
        this.mesh.load(model, evt =>
        {
            this.Run()
            this.mesh.scale.multiplyScalar(0.5);
            container.add(this.mesh);
            resolve && resolve()
        })
        this.state = { idle: 1 / 3, walk: 1 / 3, run: 1 / 3 }
    }

    Idle ()
    {
        let dest = { idle: 1, walk: 0, run: 0 }
        this.Moving(dest)
    }

    Walk ()
    {
        let dest = { idle: 0, walk: 1, run: 0 }
        this.Moving(dest)
    }

    Run ()
    {
        let dest = { idle: 0, walk: 0, run: 1 }
        this.Moving(dest)
    }

    Moving (dest)
    {
        let mesh = this.mesh
        TWEEN.removeAll()
        let moving = new TWEEN.Tween(this.state)
        .To(dest, 500)
        .Easing(TWEEN.Easing.Cubic.Out)
        .OnUpdate(function()
        {
            for (let key in dest)
            {
               mesh.play(key, this[key]) 
            }
        })
        .Start()
    }

    Update (dt)
    {
        this.mesh.update(dt)
    }
}
