const { db } = require('../database/dbClient');
const { basePageResult } = require('../constants/responses');
const { TypeChecker } = require('../helpers/typeChecker');

exports.Where = class Where {
  constructor() {
    this.conditions = [];
    this.conjunctions = [];
  }

  conjunctionValid() {
    return this.conditions.length < this.conjunctions.length - 1;
  }

  condition(query, params) {
    return {
      if: (condition) => {
        if (TypeChecker.isFunction(condition)? condition() : condition) {
          this.conditions.push({
            query: query,
            params: params
          });
        }
        return this;
      }
    }
  }

  and() {
    if (this.conjunctionValid()) {
      this.conjunctions.push(' AND ');
    }
    return this;
  }

  or() {
    if (this.conjunctionValid()) {
      this.conjunctions.push(' OR ');
    }
    return this;
  }

  toQuery() {
    if (!this.conditions.length) {
      return '';
    }
    let conditionQuery = this.conditions[0].query;
    let conditionParams = this.conditions[0].params;
    this.conditions.slice(1).forEach((condition, index) => {
      conditionQuery = conditionQuery.concat(this.conjunctions[index] || ' AND ')
        .concat(condition.query);
      Object.assign(conditionParams, condition.params);
    });
    if (conditionQuery) {
      return {
        whereQuery: `WHERE ${conditionQuery}`,
        whereParams: conditionParams
      };
    }
  }
};

exports.PaginationQuery = class PaginationQuery {
  constructor(query, params) {
    if (!query) {
      throw "missing query";
    }
    this.query = query;
    this.params = params;
  }

  withPagination(offset, limit) {
    this.offset = offset;
    this.limit = limit;
    return this;
  }

  withCountQuery(query, params) {
    this.countQuery = query;
    this.countParams = params;
    return this;
  }

  async execute() {
    const items = await db.getAll(`${this.query} LIMIT $limit OFFSET $offset`, {
      ...this.params,
      $offset: this.offset,
      $limit: this.limit
    });
    let totalItems;
    if (items.length === this.limit) {
      let countQuery = this.countQuery;
      let countParams = this.countParams;
      if (!countQuery) {
        countQuery = `SELECT COUNT(*) AS totalItems ${this.query.slice(this.query.indexOf('FROM'))}`;
        countParams = this.params;
      }
      totalItems = (await db.getOne(countQuery, countParams)).totalItems || 0;
    } else {
      totalItems = items.length;
    }
    return basePageResult(this.offset, this.limit, items, totalItems);
  }
};