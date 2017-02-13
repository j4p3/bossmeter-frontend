import React, { Component } from 'react';
import rd3 from 'react-d3';

class Chart_emotion extends Component{

componentDidMount(){
    var width = 640,
        height = 400,
        radius = Math.min(width, height) / 2;

    var color = d3.scale.category10();

    //radius of chart
    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 180);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.value; });

    //svg
    var svg = d3.select("#chartEmotion").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    //data.csv
    d3.csv("data.csv", type, function(error, data){
      //d3.csv({this.props.data.emotions}, type, function(error, data){
      console.log('this is data', data);
      if (error) throw error;

      var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function(d) { return color(d.data.emotion); });

        g.append("text")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .text(function(d) { return d.data.emotion + ' ' + '(' + d.data.value + ')'; });
      });

    function type(d) {
      d.value = +d.value;
      return d;
    }
  }

  render(){

    return(
      <div></div>
    )
  }
}

export default Chart_emotion;
