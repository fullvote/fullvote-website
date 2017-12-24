class Base {
  constructor(props) {
    const tableData = require('../table-names'); // Needs to be here re: circular dep
    Object.assign(this, props);
    const relationships = Object.keys(props).reduce((obj, prop) => {
      if (tableData.names.indexOf(prop) > -1) {
        if (tableData.singleToCollection[prop]) {
          // I *think* the above line is safe, since this is for relationships and not own
          // if (props[prop] && Array.isArray(props[prop].id)) {
          const BoConstructor = tableData.singleToCollection[prop];
          const items = Array.isArray(props[prop].id)
            ? props[prop].id.map((_, index) => {
                return Object.keys(props[prop]).reduce((o, p) => {
                  o[p] = props[prop][p][index];
                  return o;
                }, {});
              })
            : props[prop];
          obj[BoConstructor.name.toLowerCase()] = new BoConstructor(
            BoConstructor.parseFromObjects(items)
          );
        } else {
          const propCamel = prop.charAt(0).toLowerCase() + prop.slice(1);
          const BoConstructor = tableData.map[prop];
          const params = BoConstructor.parseSqlColumns(props[prop]);
          obj[propCamel] = new BoConstructor(params);
        }
      } else if (tableData.collectionsNames.indexOf(prop) > -1) {
        const BoConstructor = tableData.collectionsMap[prop];
        obj[prop] = new BoConstructor(
          BoConstructor.parseFromObjects(props[prop])
        );
      }
      return obj;
    }, {});
    Object.assign(this, relationships);
  }

  static getPrefixedColumnNames() {
    return this.sqlColumns.map(col => `${this.tableName}#${col}`);
  }

  static getSQLSelectClause() {
    return this.getPrefixedColumnNames()
      .map(
        (prefixed, index) =>
          `${this.tableName}.${this.sqlColumns[index]} as "${prefixed}"`
      )
      .join(', ');
  }

  /* Maps values from `sqlColumns` to `columns`. Can be overridden for more. */
  static parseSqlColumns(cols) {
    return this.sqlColumns.reduce((obj, col, index) => {
      obj[this.columns[index]] = cols[col];
      return obj;
    }, {});
  }

  static processFromDatabase(result) {
    return Object.keys(result).reduce((obj, column) => {
      const tableName = column.split('#')[0];
      obj[tableName] = obj[tableName] || {};
      const propertyName = column.split('#')[1];
      obj[tableName][propertyName] = result[column];
      return obj;
    }, {});
  }

  static parseFromDatabase(result) {
    const tableData = require('../table-names'); // Needs to be here re: circular dep
    const processed = this.processFromDatabase(result);
    const own = this.parseSqlColumns(processed[this.tableName]);
    const relationshipObjects = Object.keys(processed).reduce(
      (obj, tableName) => {
        if (tableName !== this.tableName) {
          obj[tableName] = processed[tableName];
        }
        return obj;
      },
      {}
    );
    return Object.assign({}, own, relationshipObjects);
  }
}

module.exports = Base;
