'use strict';

/**
 * Module dependencies
 */

// Public node modules.
const _ = require('lodash');
var postmark = require("postmark");

/* eslint-disable no-unused-vars */
module.exports = {
  provider: 'postmark',
  name: 'Postmark',
  auth: {
    postmark_default_from: {
      label: 'Postmakr Default From',
      type: 'text'
    },
    postmark_default_fromn_ame: {
      label: 'Postmark Default From Name',
      type: 'text'
    },
    postmark_default_replyto: {
      label: 'Sendmail Default Reply-To',
      type: 'text'
    },
    postmark_api_key: {
      label: 'Postmark API Key',
      type: 'text'
    }
  },
  init: (config) => {
    const client = new postmark.Client(config.postmark_api_key);

    return {
      send: (options, cb) => {
        return new Promise((resolve, reject) => {
          // Default values.
          options = _.isObject(options) ? options : {};
          options.from = options.from || config.sendmail_default_from;
          options.from_name = options.from_name || config.sendmail_default_from_name;
          options.replyTo = options.replyTo || config.sendmail_default_replyto;
          options.text = options.text || options.html;
          options.html = options.html || options.text;

          client.sendEmail({
            "From": options.from,
            "FromName": options.from_name,
            "To": options.to,
            "ReplyTo": options.replyTo,
            "Subject": options.subject, 
            "TextBody": options.text,
            "HtmlBody": options.html
          }, error => {
            if (error) {
              return reject(error);
            }

            resolve();
          });
        });
      }
    };
  }
};
