"use strict";
const Request = require( 'request' );
const PnP = require( 'robust-point-in-polygon' );

module.exports = {
	name: "flights",

	/**
	 * Default settings
	 */
	settings: {},

	/**
	 * Actions
	 */
	actions: {

		/**
		 * Returns a list of all flights.
		 *
		 * @returns
		 */
		all_us() {
			let url = 'https://opensky-network.org/api/states/all';
			let flights = Request( url, function ( error, response, body ) {

				let rsp = JSON.parse( body ); // Print the HTML for the Google homepage.

				for ( let i = 0; i < rsp['states'].length; i ++ ) {
					if ( 'United States' === rsp['states'][i][2] ) {
						console.log( JSON.stringify( rsp['states'][i][0] ) );
					}
				}
			} );
		},

		/**
		 * Welcome a username
		 *
		 * @param {String} name - User name
		 */
		get_registration: {
			params: {
				hex: "string"
			},
			handler( ctx ) {

				let url = 'https://ae.roplan.es/api/hex-reg.php?hex=';
				let response = '';
				let registration = Request( url + ctx.params.hex, function ( error, response, body ) {
					console.log( body );
					response = `Welcome, ${ctx.params.name}`;
				} );

				return response;
			}
		}
	},

	/**
	 * Events
	 */
	events: {},

	/**
	 * Methods
	 */
	methods: {},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	stopped() {

	}
};