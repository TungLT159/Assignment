import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


class DishDetail extends Component {
    constructor(props) {
        super(props);
    }

    RenderDish(dish){
        if(dish){
            return (
                <div className="col-sm-12 col-md-5 col-lg-5 m-1">
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                        <CardTitle>
                            {dish.name}
                        </CardTitle>
                        <CardText>
                            {dish.description}
                        </CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        }else{
            return <div></div>
        }
    }

    RenderComment(comments){
        if(comments){
            return(
                <div className="col-sm-12 col-md-5 col-lg-5 m-1">
                    <h4>Comments</h4>
                     {this.props.dish.comments.map(comment=>{
                        return (
                            <div>
                                <p>{comment.comment}</p>
                                <p>{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </div>
                        )
                    })}
                </div>
            )
        }else{
            return <div></div>
        }
    }

    
    render() {
        return (
           <div className="container">
                <div className="row">
                    {this.RenderDish(this.props.dish)}
                    {this.RenderComment(this.props.dish)}
                </div>
           </div>
        )
    }
}

export default DishDetail