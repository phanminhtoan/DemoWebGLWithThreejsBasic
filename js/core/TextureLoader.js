export class TextureLoader
{
    constructor ()
    {
        textureloader_ = new THREE.TextureLoader()
        data_ = {}
        promises_ = []
    }

    LoadTexture (alias, url)
    {
        promises_.push(new Promise((resolve, reject) =>
        {
            textureloader_.load(url, function(texture)
            {
                data_[alias] = texture
                resolve()
            })
        }))
    }

    Load (textures, callback)
    {
        for (let alias in textures)
        {
            this.LoadTexture(alias, textures[alias])
        }
        Promise.all(promises_).then(callback)
    }

    Get (alias)
    {
       return data_[alias]
    }
}

let textureloader_ = undefined
let data_ = undefined
let promises_ = undefined
