/**
 * Created by aaronksaunders on 12/20/16.
 */

/* global google */
import {
    default as React,
    Component,
} from "react";


import {
    GoogleMapLoader, GoogleMap, Marker
} from "react-google-maps";


/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export class MapComponent extends Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            started: true
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                user: {
                    position: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    },
                    mapCenter: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    },
                   // icon: 'user-position-icon.png'
                }
            })
        });
    }

    render() {
        console.log("in render")
        console.log("user", this.state.user)
        return (
            <section {...this.props}>
                <GoogleMapLoader
                    containerElement={
                        <div
                            style={{
                                height: "inherit"
                            }}
                        />
                    }
                    googleMapElement={
                        <GoogleMap
                            ref={(map) => {console.log(map), this.props}}
                            defaultZoom={16}
                            center={ this.state.user && this.state.user.mapCenter }>
                            <Marker { ...this.state.user } />
                        </GoogleMap>
                    }
                />
            </section>
        );
    }
}