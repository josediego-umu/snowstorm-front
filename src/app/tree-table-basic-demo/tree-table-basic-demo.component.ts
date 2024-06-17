import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MenuItem, TreeNode } from 'primeng/api';
import { NodeService } from '../services/node.service';
import { TreeTable } from 'primeng/treetable';

@Component({
  selector: 'app-tree-table-basic-demo',
  templateUrl: './tree-table-basic-demo.component.html',
  styleUrls: ['./tree-table-basic-demo.component.css']
})
export class TreeTableBasicDemo implements OnInit {
  @Input() files!: TreeNode[];
  @Input() cols!: any[];
  @ViewChild('tt') treeTable!: TreeTable;
  @Output() nodeSelected = new EventEmitter<any>();
  
  selectedNode!: TreeNode;
  items!: MenuItem[];

  filterMode = 'lenient';
  filterModes = [
    { label: 'Lenient', value: 'lenient' },
    { label: 'Strict', value: 'strict' }
  ];

  constructor(private nodeService: NodeService) {}

  ngOnInit() {
    console.log('ngOnInit tree-table-basic-demo.component.ts');
    this.items = [
      { label: "Toggle", icon: 'bi bi-chevron-bar-expand', command: (event) => this.toggleFile(this.selectedNode) }
    ];
  }

  filterGlobal(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      const value = inputElement.value;
      this.treeTable.filterGlobal(value, 'contains'); 
    }
  }

  filterColumn(event: Event, field: string, matchMode: string) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      const value = inputElement.value;
      this.treeTable?.filter(value, field, matchMode); // Usa treeTable para filtrar columnas
    }
  }

  toggleFile(node: any) {
    console.log('Node:', node);
    node.expanded = !node.expanded;
    this.files = [...this.files];
}

selectValue(value: TreeNode) {
  
  this.nodeSelected.emit(value);
}


}

