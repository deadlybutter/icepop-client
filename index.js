class Client {

  /**
   * Setup an Icepop API client.
   *
   * @param  {Object} options
   *
   * @param  {String} namespace API namespace (eg: 'api')
   * @param  {String} version   Scope of endpoints to target (eg: 'v1')
   * @param  {String} key       API key (Optional)
   * @return {Object}           API Client
   */
  constructor(options) {
    this.domain = `${options.namespace || 'api'}/${options.version || 'v1'}/`;
    this.key = options.key || '';
  }

  /**
   * Default response handler
   *
   * @param  {Object} res        Fetch response
   * @return {Object}            JSON response
   */
  responseHandler(res) {
    return res.json();
  }

  /**
   * Turn an object of key/values into a query string
   *
   * @param  {Object} data
   * @return {String}
   */
  stringify(data) {
    return Object.keys(data).join((param) => `${param}=${data[param]}&`);
  }

  /**
   * Get an individual entity.
   *
   * @param  {String} type       Type of the entity
   * @param  {String} identifier The field you're referencing (eg: _id)
   * @param  {String} value      The value of the field
   * @return {Object}            JSON response
   */
  get(type, identifier, value) {
    return fetch(`${this.domain}${type}/${identifier}/${value}`)
      .then(this.responseHandler);
  }

  /**
   * Query on an entity.
   *
   * @param  {String} type       Type of the entity
   * @param  {Object} params     Object containing key/value pairs of parameters to query with
   * @return {Object}            JSON response
   */
  query(type, params) {
    return fetch(`${this.domain}${type}?${this.stringify(params)}`)
      .then(this.responseHandler);
  }

  /**
   * Edit an individual entity.
   *
   * @param  {String} type       Type of the entity
   * @param  {String} identifier The field you're referencing (eg: _id)
   * @param  {String} value      The value of the field
   * @param  {Object} data       Data to edit
   * @return {Object}            JSON response
   */
  edit(type, identifier, value, data) {
    data['key'] = this.key;

    return fetch(`${this.domain}${type}/${identifier}/${value}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
      body: JSON.stringify(data),
    })
    .then(this.responseHandler);
  }

  /**
   * Create a new entity.
   *
   * @param  {String} type       The type of entity to create.
   * @param  {Object} data       The data to create with.
   * @return {Object}            JSON response
   */
  create(type, data) {
    data['key'] = this.key;

    return fetch(`${this.domain}${type}`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
      body: JSON.stringify(data),
    })
    .then(this.responseHandler);
  }

  /**
   * Delete an entity.
   *
   * @param  {String} type       Type of the entity
   * @param  {String} identifier The field you're referencing (eg: _id)
   * @param  {String} value      The value of the field
   * @return {Object}            JSON response
   */
  delete(type, identifier, value) {
    return fetch(`${this.domain}${type}/${identifier}/${value}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
      body: JSON.stringify({ key: this.key }),
    })
    .then(this.responseHandler);
  }
}

module.exports = Client;
