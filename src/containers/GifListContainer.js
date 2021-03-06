import React from 'react'
import GifList from '../components/GifList'
import GifSearch from '../components/GifSearch'

class GifListContainer extends React.Component {

    state = {
        gifs: [],
        searchQuery: "",
        limit: null
    }

    searchHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.getGifs()
        console.log("this.state.limit:", this.state.limit)
        this.setState({searchQuery: "", limit: ""}, console.log("this.state.limit:", this.state.limit))
    }

    render() {
        return(
            <div>
                <GifList gifs={this.state.gifs}/>
                <GifSearch submitHandler={this.submitHandler} searchHandler={this.searchHandler} searchQuery={this.state.searchQuery} limit={this.state.limit}/>
            </div>
        )
    }

    mapImages = (gifObjs) => {
        return(
            gifObjs.map(gif =>{
                return gif.images.original.url
            })
        )
    }

    getGifs = () => {
        fetch(`https://api.giphy.com/v1/gifs/search?q=${this.state.searchQuery}&api_key=m4WE3NaOwEviHSLd7Xj9JVSnIlHSzGDE&rating=g&limit=${this.state.limit}`)
            .then(response => response.json())
            .then(newGifs => {
                console.log("new gifts from fetch:", newGifs)
                this.setState({
                    gifs: this.mapImages(newGifs.data)
            },
            console.log(this.state.gifs))
            
        })
    }
}

export default GifListContainer
