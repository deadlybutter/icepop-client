import 'whatwg-fetch';

class Client {

  /**
   * Setup an Icepop API client.
   *
   * @param  {String} namespace API namespace (eg: 'api')
   * @param  {String} version   Scope of endpoints to target (eg: 'v1')
   * @param  {String} key       API key (Optional)
   * @return {Object}           API Client
   */
  constructor(namespace = 'api', version = 'v1', key = '') {
    this.namespace = namespace;
    this.version = version;
    this.domain = `${namespace}/${version}/`;

    this.key = key;
  }

  responseHandler(res) {
    return res.json();
  }

  /**
   * Get an individual entity.
   *
   * @param  {String} type       Type of the entity
   * @param  {String} identifier The field you're referencing (eg: _id)
   * @param  {String} value      The value of the field
   * @return {Promise}           Promise containing the JSON response
   */
  get(type, identifier, value) {
    return fetch(`${this.domain}${type}/${identifier}/${value}`)
      .then(this.responseHandler);
  }

  /**
   * Query on an entity.
   *
   * @param  {String} type       Type of the entity
   * @param  {Array}  params     Array containing key/value pairs of parameters to query with
   *                                [
   *                                  {
   *                                    name: 'page',
   *                                    value: 1,
   *                                  },
   *                                  ...
   *                                ]
   * @return {Promise}           Promise containing the JSON response
   */
  query(type, params) {
    return fetch(`${this.domain}${type}?${params.join((param) => `${param.name}=${param.value}&`)}`)
      .then(this.responseHandler);
  }
}


module.exports = Client;
