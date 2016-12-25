var nodeify = require('bluebird-nodeify');
var httpClient = require('./httpclient');


/**
 *  constructor
 */
function User() {}

/**
 * get user list
 * 
 * @param {object} params
 * @param {function} callback
 * @returns
 */
User.prototype.list = function(params, callback) {
   var url = 'users';
   return nodeify(httpClient.httpRequest('GET', url, params), callback);
}


/**
 * create user
 * 
 * @param {object} params
 * @param {function} callback
 */
User.prototype.create = function(params, callback) {
    var url = 'users';
    return nodeify(httpClient.httpRequest('POST', url, params), callback);
}


/**
 * update user password
 * 
 * @param {string} id
 * @param {string} password
 * @param {function} callback
 */
User.prototype.updatePassword = function(id, password, callback) {
    var url = 'users/'+id+'/password';
    return nodeify(httpClient.httpRequest('PUT', url, {password: password}), callback);
}


/**
 * user identity authentication
 * 
 * @param {string} username
 * @param {string} password
 * @param {function} callbacl
 */
User.prototype.auth = function(username, password, callbacl) {
    var url = 'account/login';
    return nodeify(httpClient.httpRequest('POST', url, {username:username, password:password}),
            callbacl); 
};

/**
 * get aceess token for special user 
 * 
 * @param {string} id           uuid
 * @param {string} scope        resource scope
 * @param {function} callback   callback
 * 
 * @returns 
 */
User.prototype.assume = function(id, scope='*', callback) {
    var url = 'users/' + id + '/assume';
    return nodeify(httpClient.httpRequest('POST', url, {}), callback);
}


/**
 * search user 
 * 
 * @param {object} params
 * @param {function} callback
 * @returns
 */
User.prototype.search = function(params, callback) {
    var url = 'search/user';
    return nodeify(httpClient.httpRequest('POST', url, params), callback); 
}

// exports User Object
exports = module.exports = User;