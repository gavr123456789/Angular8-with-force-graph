import {AfterViewInit, Component, ElementRef, HostListener, OnInit} from '@angular/core';
import ForceGraph, {ForceGraphInstance} from 'force-graph';


interface Node {
  id: number;
}

interface Link {
  source: number;
  target: number;
  group?: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'myapp';
  sas = 'sas';
  N = 10;


  private graph!: ForceGraphInstance;

  private samples = 20;
  private nodes: Node[] = [...Array(this.N).keys()].map(i => ({ id: i }));
  private links: Link[] = [...Array(this.N).keys()]
    .filter(id => id)
    .map(id => ({
      source: id,
      target: Math.round(Math.random() * (id - 1))
    }));

  private gData = {
    nodes: this.nodes,
    links: this.links
  };

  constructor(private elementRef: ElementRef) {
    console.log(this.gData);
  }
  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.graph = ForceGraph()(this.htmlElement);
    // this.graph.linkColor(({group}) => group ? '#ffffff' : '#ff9c91');
    // this.graph.linkWidth(({group}) => group ? 2 : 10);
    // this.graph.d3Force('link').distance(({group}) => (group ? 20 : 100));
    this.graph.graphData(this.gData);

    // this.windowResize();
  }

  @HostListener('window:resize')
  public windowResize(): void {
    const box = this.htmlElement.getBoundingClientRect();
    this.graph?.width(box.width);
    this.graph?.height(box.height);
    // this.graph?.controls().handleResize();
  }

  private get htmlElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
  // constructor() {
  //   // Random tree
  //   const N = 300;
  //   const gData = {
  //     nodes: [...Array(N).keys()].map(i => ({ id: i })),
  //     links: [...Array(N).keys()]
  //       .filter(id => id)
  //       .map(id => ({
  //         source: id,
  //         target: Math.round(Math.random() * (id - 1))
  //       }))
  //   };
  //
  //   const Graph = ForceGraph()
  //   (document.getElementById('graph'))
  //     .linkDirectionalParticles(2)
  //     .graphData(gData);
}

