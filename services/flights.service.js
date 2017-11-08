"use strict";
const Request = require( "request" );
const PnP = require( "point-in-polygon" );

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
			let url = "https://opensky-network.org/api/states/all";
			let polygon = [
				[
					38.895643,
					- 77.072973
				],
				[
					38.912033,
					- 77.060248
				],
				[
					38.905492,
					- 77.028271
				],
				[
					38.883298,
					- 77.006018
				],
				[
					38.850398,
					- 77.017953
				],
				[
					38.845780,
					- 77.056642
				]
			];
			let flights = Request( url, function ( error, response, body ) {

				let rsp = JSON.parse( body );
				let pointInPoly = false;
				let matchingFlights = rsp;

				for ( let i = 0; i < rsp["states"].length; i ++ ) {
					if ( "United States" !== rsp["states"][i][2] ) {
						continue;
					}

					pointInPoly = PnP( [rsp["states"][i][6], rsp["states"][i][5]], polygon );

					if ( true === pointInPoly ) {
						console.log( [rsp["states"][i][6], rsp["states"][i][5]] );

						matchingFlights[i] = rsp["states"][i][0];
					}
				}

				return matchingFlights;
			} );

			return flights;
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

				let url = "https://ae.roplan.es/api/hex-reg.php?hex=";
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