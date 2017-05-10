require('./core/zepto')
import { MyAd } from './MyAd'

window.main = Main
window.onresize = OnResize

window.log = function(msg)
{
    console.log(msg)
    $('#logtext')[0].innerHTML = `[${JSON.stringify(msg)}]<br>` + $('#logtext')[0].innerHTML
}

window.TransformURL = function(url)
{
    return ADS_SERVER_URL + url
}

window.GetAsset = function(url)
{
    if (ADS_TYPE == 'OMS')
        return resource.get_src(url)
    return url
}

window.GetEmbedAsset = function(url)
{
    if (ADS_TYPE == 'OMS')
        return resource.get_embed_src(url)
    return url
}

function OnResize()
{
    myAd.Resize(window.innerWidth, window.innerHeight)
}

function Main()
{
    if (ADS_TYPE == 'LOCAL')
    {
        $('#logtext').css('display', 'block')
    }

    window.ownerDocument = document
    var elem = ownerDocument.getElementById('adFrame')
    if (typeof (html) !== 'undefined')
    {
        if (typeof elem === 'undefined' || elem == null)
            ownerDocument.body.innerHTML = html
        else
            elem.innerHTML = html
    }

    myAd = new MyAd(window.innerWidth, window.innerHeight)
}

let myAd = undefined
