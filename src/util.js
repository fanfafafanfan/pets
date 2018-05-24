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

export const areaArray = [
    {label: '北京', value: '北京', children: [
        {label: '北京市', value: '北京市', children: [
            {label: '朝阳区', value: '朝阳区'},
            {label: '海淀区', value: '海淀区'},
            {label: '东城区', value: '东城区'},
            {label: '西城区', value: '西城区'},
            {label: '丰台区', value: '丰台区'},
            {label: '石景山区', value: '石景山区'},
            {label: '门头沟区', value: '门头沟区'},
            {label: '房山区', value: '房山区'},
            {label: '通州区', value: '通州区'},
            {label: '顺义区', value: '顺义区'},
            {label: '昌平区', value: '昌平区'},
            {label: '大兴区', value: '大兴区'},
            {label: '怀柔区', value: '怀柔区'},
            {label: '平谷区', value: '平谷区'},
            {label: '密云区', value: '密云区'},
            {label: '延庆区', value: '延庆区'}
        ]}
    ]},
    {label: '辽宁省', value: '辽宁省', children: [
        {label: '沈阳市', value: '沈阳市', children: [
            {label: '沈河区', value: '沈河区'},
            {label: '浑南区', value: '浑南区'},
            {label: '沈北新区', value: '沈北新区'},
            {label: '和平区', value: '和平区'},
            {label: '大东区', value: '大东区'},
            {label: '皇姑区', value: '皇姑区'},
            {label: '铁西区', value: '铁西区'},
            {label: '于洪区', value: '于洪区'},
            {label: '辽中区', value: '辽中区'},
            {label: '新民市', value: '新民市'},
            {label: '康平县', value: '康平县'}
        ]},
        {label: '本溪市', value: '本溪市', children: [
            {label: '溪湖区', value: '溪湖区'},
            {label: '东明区', value: '东明区'},
            {label: '桓仁满族自治县', value: '桓仁满族自治县'},
            {label: '平山区', value: '平山区'},
            {label: '明山区', value: '明山区'},
            {label: '南芬区', value: '南芬区'},
            {label: '本溪满族自治县', value: '本溪满族自治县'}
        ]},
        {label: '盘锦市', value: '盘锦市', children: [
            {label: '兴隆台区', value: '兴隆台区'},
            {label: '双台子区', value: '双台子区'},
            {label: '大洼区', value: '大洼区'},
            {label: '盘山县', value: '盘山县'}
        ]}
    ]},    
    {label: '云南省', value: '云南省', children: [
        {label: '昆明市', value: '昆明市', children:[
            {label: '五华区', value: '五华区'},
            {label: '官渡区', value: '官渡区'},
            {label: '呈贡区', value: '呈贡区'}
        ]},
        {label: '丽江市', value: '丽江市', children:[
            {label: '古城区', value: '古城区'},
            {label: '永胜县', value: '永胜县'},
            {label: '华坪县', value: '华坪县'}
        ]},
        {label: '保山市', value: '保山市', children:[
            {label: '隆阳区', value: '隆阳区'},
            {label: '腾冲市', value: '腾冲市'},
            {label: '昌宁县', value: '昌宁县'}
        ]}
    ]},
    {label: '上海', value: '上海', children: [
        {label: '上海市', value: '上海市', children:[
            {label: '黄浦区', value: '黄浦区'},
            {label: '徐汇区', value: '徐汇区'},
            {label: '长宁区', value: '长宁区'},
            {label: '静安区', value: '静安区'},
            {label: '虹口区', value: '虹口区'},
            {label: '金山区', value: '金山区'}
        ]}
    ]},
    {label: '江西省', value: '江西省', children: [
        {label: '南昌市', value: '南昌市', children:[
            {label: '东湖区', value: '东湖区'},
            {label: '西湖区', value: '西湖区'},
            {label: '青云谱区', value: '青云谱区'},
            {label: '湾里区', value: '湾里区'},
            {label: '青山湖区', value: '青山湖区'},
            {label: '新建区', value: '新建区'},
            {label: '南昌县', value: '南昌县'},
            {label: '安义县', value: '安义县'},
            {label: '永修县', value: '永修县'}
        ]},
        {label: '九江市', value: '九江市', children:[
            {label: '浔阳区', value: '浔阳区'},
            {label: '濂溪区', value: '濂溪区'},
            {label: '柴桑区', value: '柴桑区'},
            {label: '瑞昌市', value: '瑞昌市'},
            {label: '共青城市', value: '共青城市'},
            {label: '庐山市', value: '庐山市'},
            {label: '武宁县', value: '武宁县'},
            {label: '修水县', value: '修水县'},
            {label: '永修县', value: '永修县'},
            {label: '德安县', value: '德安县'},
            {label: '都昌县', value: '都昌县'},
            {label: '湖口县', value: '湖口县'},
            {label: '彭泽县', value: '彭泽县'}
        ]},
        {label: '新余市', value: '新余市', children:[
            {label: '渝水区', value: '渝水区'},
            {label: '分宜县', value: '分宜县'}
        ]},
        {label: '上饶市', value: '上饶市', children:[
            {label: '信州区', value: '信州区'},
            {label: '广丰区', value: '广丰区'},
            {label: '德兴市', value: '德兴市'},
            {label: '上饶县', value: '上饶县'},
            {label: '玉山县', value: '玉山县'},
            {label: '铅山县', value: '铅山县'},
            {label: '余干县', value: '余干县'},
            {label: '万年县', value: '万年县'},
            {label: '婺源县', value: '婺源县'},
            {label: '鄱阳县', value: '鄱阳县'}
        ]},
    ]},
];