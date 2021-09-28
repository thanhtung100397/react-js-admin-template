const { db } = require('../../database/dbClient');
const { pagination } = require('../../constants/responses');
const { PaginationQuery, Where } = require('../../helpers/queryHelpers');
const { AppResponses } = require('../../constants/responses');
const { isNotEmpty } = require('../../helpers/stringHelpers');

exports.userApis = [
  {
    method: 'GET',
    path: '/api/users',
    authRequired: true,
    handle: async (req, res) => {
      const { username, banned } = req.query;
      const { offset, limit } = pagination(req);

      const { whereQuery, whereParams } = new Where()
        .condition('username = $username', {
          $username: username
        }).if(isNotEmpty(username))
        .and()
        .condition('banned = $banned', {
          $banned: banned
        }).if(isNotEmpty(banned))
        .toQuery();

      const pageUsers = await new PaginationQuery(
        `SELECT id, username, first_name, last_name, banned, created_date FROM user ${whereQuery}`,
        whereParams
      ).withPagination(offset, limit)
        .execute();

      res.jsonResponse(pageUsers);
    }
  },
  {
    method: 'GET',
    path: '/api/users/:userId',
    authRequired: true,
    handle: async (req, res) => {
      const { userId } = req.params;

      const user = await db.getAll(
        'SELECT id, username, first_name, last_name, banned, created_date FROM user WHERE id = $userId',
        {
          $userId: userId
        }
      );

      if (!user) {
        throw new AppResponses.USER_NOT_FOUND
      }

      res.jsonResponse(user)
    }
  }
];