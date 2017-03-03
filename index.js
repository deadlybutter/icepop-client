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
  constructor(namespace = 'api', version = 'api', key = '') {
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
    console.log(`${this.domain}${type}/${identifier}/${value}`);
    return fetch(`${this.domain}${type}/${identifier}/${value}`).then(this.responseHandler);
  }
}


module.exports = Client;
