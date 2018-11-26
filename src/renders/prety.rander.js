/* eslint-disable lodash/prefer-lodash-method */
const type = { deleted: '- ', added: '+ ', notChanged: '  ' };

const strifyObj = (obj, depth, prefix = '') => {
  const arrStr = Object.keys(obj).reduce((acc, key) => {
    if (obj[key] instanceof Object) {
      return [...acc, `${' '.repeat(depth - 2)}${prefix}${key}: {`,
        `${strifyObj(obj[key], depth + 4, '  ')}\n${' '.repeat(depth)}}`];
    }
    return [...acc, `${' '.repeat(depth - 2)}${prefix}${key}: ${obj[key]}`];
  }, []);
  return arrStr.join('\n');
};

const arrPrettyDiff = (arr, depth = 4) => {
  const resultArr = arr.reduce((acc, obj) => {
    if (obj.type === 'node') {
      return [...acc, `${' '.repeat(depth)}${obj.key}: {`, ...arrPrettyDiff(obj.children, depth + 4),
        `${' '.repeat(depth)}}`];
    }
    if (obj.type === 'modifed') {
      const oldVal = { [obj.key]: obj.oldValue };
      const newVal = { [obj.key]: obj.newValue };
      return [...acc, strifyObj(newVal, depth, type.added), strifyObj(oldVal, depth, type.deleted)];
    }
    const prefix = type[obj.type];
    const objContent = { [obj.key]: obj.value };
    return [...acc, strifyObj(objContent, depth, prefix)];
  }, []);
  return resultArr;
};

export default (arr, depth) => `{\n${arrPrettyDiff(arr, depth).join('\n')}\n}`;