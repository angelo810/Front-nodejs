import React, { Component } from 'react';
import ReactPaginate from "react-paginate";

class App extends Component {

  constructor() {
    super();
    data = {
      artist: '',
      dateSong: '',
      name: '',
      genere: '',
      visit: '',
      _id: '',
      songs: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addSong = this.addSong.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addSong(e) {
    e.preventDefault();
    if(data._id) {
      fetch(`/api/songs/${data._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          artist: data.artist,
          dateSong: data.dateSong,
          name: data.name,
          genere: data.genere,
          visit: data.visit

        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          window.M.toast({html: 'Song Updated'});
          this.setState({_id: '', artist: '', dateSong: '',name: '',genere: '',visit: ''});
          this.fetchSongs();
        });
    } else {
      fetch('/api/songs', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          window.M.toast({html: 'Song Saved'});
          this.setState({artist: '', dateSong: '',name: '',genere: '',visit: ''});
          this.fetchSongs();
        })
        .catch(err => console.error(err));
    }

  }

  deleteSong(id) {
    if(confirm('Seguro deseas eliminar?')) {
      fetch(`/api/songs/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({html: 'Song deleted'});
          this.fetchSongs();
        });
    }
  }

  editSong(id) {
    fetch(`/api/songs/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          artist: data.artist,
          dateSong: data.dateSong,
          name: data.name,
          genere: data.genere,
          visit: data.visit,
          _id: data._id
        });
      });
  }

  componentDidMount() {
    this.fetchSongs();
  }

  fetchSongs() {
    fetch('/api/songs')
      .then(res => res.json())
      .then(data => {
        this.setState({songs: data});
        console.log(data.songs);
      });
  }

  render() {
    return (
      <div>
        {/* NAVIGATION */}
        <nav className="pink darken-4">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">Song List</a>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addSong}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="artist" onChange={this.handleChange} value={data.artist} type="text" placeholder="Artista de la Canción" autoFocus/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="dateSong" onChange={this.handleChange} value={data.dateSong} type="date" placeholder="Fecha" autoFocus/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="name" onChange={this.handleChange} value={data.name} type="text" placeholder="Nombre de la canción" autoFocus/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="genere" onChange={this.handleChange} value={data.genere} type="text" placeholder="Genero de la Canción" autoFocus/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="visit" onChange={this.handleChange} value={data.visit} type="text" placeholder="Visitas de la Canción" autoFocus/>
                      </div>
                    </div>
                    <button type="submit" className="btn light-blue darken-4">
                      Guardar 
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Artista</th>
                    <th>Fecha de Lanzamiento</th>
                    <th>Nombre</th>
                    <th>Genero Musical</th>
                    <th>Numero de Visitas</th>
                  </tr>
                </thead>
                <tbody>
                  { 
                    data.songs.map(song => {
                      return (
                        <tr key={song._id}>
                          <td>{song.artist}</td>
                          <td>{song.dateSong}</td>
                          <td>{song.name}</td>
                          <td>{song.genere}</td>
                          <td>{song.visit}</td>
                          <td>
                            <button onClick={() => this.deleteSong(song._id)} className="btn red darken-4">
                              Eliminar
                            </button>
                            <button onClick={() => this.editSong(song._id)} className="btn light-blue darken-4" style={{margin: '4px'}}>
                              Editar
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav>

<ReactPaginate
                  className="pagination"
                  breakLabel="..."
                  pageClassName="page-link" 
                  nextClassName="page-link"
                  nextLabel="Next »"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousClassName="page-link bg-red"
                  previousLabel="« Previous"/>
      </div>
    )
  }
}

export default App;
