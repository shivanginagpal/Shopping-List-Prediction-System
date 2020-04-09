import React, { Component } from 'react';
import Moment from 'react-moment';

export default class ShowCurrentList extends Component {
    render() {
        const {lists} = this.props;
        console.log(lists);
            
        let showLists = lists.map(list => {
                console.log(list);
                return(
                <div class="col-sm-6">
                    <div class="card">
                    <div class="card-body w-75">
                    <h5 class="card-title">{list.listName}</h5>
                    <p class="card-text"><strong>Created :</strong>
                    <Moment format="YYYY/MM/DD">{list.date}</Moment>
                    </p>
                    <div className="col-3">
                        <button
                            type="button"
                            className="btn btn-outline-success"
                            //onClick={() => this.showModal(list)} 
                        >
                    Details
                  </button>
                </div>
                {/* <div className="col-10">
                    <button
                        type="button"
                        className="btn btn-primary"
                        //onClick={() => this.showModal_2(list)} 
                    >
                        Edit
                    </button>
                </div> */}
                    
                    </div>
                    </div>
                </div>
                 );
                
            });   
        
        return(
            <div>
                {showLists}
            </div>
        )
    } 
}