"use strict";
const request = require( "request" );
const rp = require( "request-promise" );
const PnP = require( "point-in-polygon" );

module.exports = {
	name: "flights",

	/**
	 * Default settings
	 */
	settings: {},

	/**
	 * The polygon to look inside of.
	 */
	polygon: [],

	/**
	 * The flights in the polygon
	 */
	flights: [],

	/**
	 * Actions
	 */
	actions: {

		/**
		 * Returns a list of all flights.
		 *
		 * @returns
		 */
		proximate: {
			params: {
				window: "string"
			},
			handler( ctx ) {
				let url = "https://opensky-network.org/api/states/all";
				let self = this;
				let flights = [];
				self.get_polygon();


				request( url, function ( error, response, body ) {

					let rsp = JSON.parse( body );
					let pointInPoly = false;
					let matchingFlights = [];

					for ( let i = 0; i < rsp["states"].length; i ++ ) {
						if ( "United States" !== rsp["states"][i][2] ) {
							continue;
						}

						pointInPoly = PnP( [rsp["states"][i][6], rsp["states"][i][5]], self.polygon );

						if ( true === pointInPoly ) {


							matchingFlights.push( rsp["states"][i][0] );

						}
					}

					for ( let i = 0; i < matchingFlights.length; i ++ ) {
						//console.log( matchingFlights[i] );
						flights[i] = {
							"hex_code": matchingFlights[i],
							"registration": self.get_registration( matchingFlights[i] ),
						};
					}

					console.log( flights );
				} );
			}
		},
	},

	/**
	 * Events
	 */
	events: {}
	,

	/**
	 * Methods
	 */
	methods: {

		get_polygon: function ( windowSide ) {

			let self = this;

			switch ( windowSide ) {

				case "back":
					self.polygon = [
						[
							38.895643,
							- 79.072973
						],
						[
							33.912033,
							- 77.060248
						],
						[
							33.905492,
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
					break;

				case "side":
					self.polygon = [
						[
							38.895643,
							- 79.072973
						],
						[
							33.912033,
							- 77.060248
						],
						[
							33.905492,
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
					break;

				default:
					self.polygon = [
						[
							38.895643,
							- 79.072973
						],
						[
							33.912033,
							- 77.060248
						],
						[
							33.905492,
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
					break;
			}
		},

		get_registration: function ( hex_code ) {
			let url = "https://ae.roplan.es/api/hex-reg.php?hex=";
			let response = '';
			request( url + hex_code, function ( error, response, body ) {
				console.log( body );
				return body;
			} );
		},
	},

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