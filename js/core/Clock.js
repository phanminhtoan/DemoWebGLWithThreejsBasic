export let Clock = new class
{
    constructor (autoStart = true)
    {
        this.autoStart = autoStart

        this.startTime = 0
        this.oldTime = 0
        this.elapsedTime = 0

        this.running = false
    }

    Start ()
    {
        this.startTime = (window.performance || Date).now()

        this.oldTime = this.startTime
        this.elapsedTime = 0
        this.running = true
    }

    Stop ()
    {
        this.GetElapsedTime()
        this.running = false
    }

    GetElapsedTime ()
    {
        this.GetDelta()
        return this.elapsedTime
    }

    GetDelta ()
    {
        let diff = 0

        if (this.autoStart && !this.running)
        {
            this.Start()
        }

        if (this.running)
        {
            let newTime = (window.performance || Date).now()
            diff = (newTime - this.oldTime) / 1000
            this.oldTime = newTime
            this.elapsedTime += diff
        }

        return diff
    }
}
