export const googleAPIUrl = "https://storage.googleapis.com/mannequin/2018/data/productwall/accessories/en_us.json?c=1571310916";

export const isSuperSet = (set, subSet) => {
    for (let elem of subSet) {
    if (!set.has(elem)) {
            return false;
        }
    }
    return true;
 }

export const union = (setA, setB) => {
    let _union = new Set(setA);
    for (let elem of setB) {
        _union.add(elem);
    }
    return _union;
}

export const intersection = (setA, setB) => {
    var _intersection = new Set();
    for (var elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem);
        }
    }
    return _intersection;
}

export const difference = (setA, setB) => {
    var _difference = new Set(setA);
    for (var elem of setB) {
        _difference.delete(elem);
    }
    return _difference;
}