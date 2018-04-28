export function getRedirectPath({ type, avatar }) {
    //根据用户信息 返回跳转地址
    if (!avatar) {
        let _url = (type === 'lingyang' ? '/lingyang' : '/jiuzhu')
        _url += 'info'
        return _url
    } else {
        let url = '/home'
        return url
    }
}

export function getChatId(userId,targetId) {
    return [userId,targetId].sort().join('_')
}

export function fixCarousel() {
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
    }, 0);
}