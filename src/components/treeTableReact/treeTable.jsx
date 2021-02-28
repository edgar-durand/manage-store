// Para crear una tabla tipo arbol
import React from 'react'
import {uuidv4} from "../../js/uuidv4";
export function TreeTable(settings) {

    var allColumns = Array.isArray(settings.columns) ? settings.columns : [];
    var data = Array.isArray(settings.data) ? settings.data : [];

    var columns = [];

    for (var ac = 0, lenAc = allColumns.length; ac < lenAc; ac++) {
        var currentColumn = allColumns[ac];
        if (currentColumn['visible'] === false) continue;
        columns.push(currentColumn);
    }

    var columnsLength = columns.length;

    function actionLink(e) {

        var path = e.nativeEvent.composedPath();
        function getNode(name) {
            var node = null;
            for (var k in path) {
                if (path[k].nodeName === name) {
                    node = path[k]
                    break
                }
            }
            return node;
        }

        var tr = getNode('TR')
        var icon = tr.querySelector('[icon-tree-table]')
        var body = getNode('TBODY')

        var target = '[data-parent="' + tr.getAttribute('data-index') + '"]';
        var isExpanded = tr.getAttribute('data-control') === 'expanded';
        var children = body.querySelectorAll(target);

        if (!isExpanded) {

            for (var c = 0, len = children.length; c < len; c++) {
                var current = children[c];
                current.style.display = '';
                var a = current.querySelector('[icon-tree-table]');
                if (a) a.setAttribute('style', "transform: rotate(0deg)");
            }
            icon.style.transform = 'rotate(90deg)';
            tr.setAttribute('data-control', 'expanded');
        } else {

            var closeChildren = function (children) {
                for (var i = 0, len = children.length; i < len; i++) {
                    var current = children[i];
                    current.style.display = 'none';
                    var id = current.getAttribute('data-index');
                    var child = body.querySelectorAll('[data-parent="' + id + '"]');
                    var currentExpanded = current.getAttribute('data-control') === 'expanded';
                    if (child.length > 0 && currentExpanded) {
                        current.setAttribute('data-control', 'collapsed');
                        closeChildren(child);
                    }
                }
            };
            closeChildren(children);
            icon.style.transform = 'rotate(0deg)'
            tr.setAttribute('data-control', 'collapsed');
        }
    }

    var index = -1;
    function Level(props) {

        const { dataLevel, lv, parentRow } = props;
        return (
            <React.Fragment>
                {
                    dataLevel.map(function (row) {
                        index++;
                        var treeChildren = [];

                        for (var ch in row) {
                            if (Array.isArray(row[ch]) && row[ch].length > 0) treeChildren.push(ch);
                        }

                        for (var c = 0; c < columnsLength; c++) {
                            row[columns[c].data] = row[columns[c].data] ? row[columns[c].data] : '';
                        }

                        return (
                            <React.Fragment key={uuidv4()}>
                                <tr className='col-12' data-index={index} data-level={lv} data-parent={lv > 1 ? parentRow : null} data-control={treeChildren.length > 0 ? 'collapsed' : null} style={{ display: lv > 1 ? 'none' : null }}>
                                    {   columns.map(function (currentCol, i) {                                        

                                            var data = row[currentCol.data] ? row[currentCol.data] : '';
                                            var text = typeof currentCol.render === 'function' ? currentCol.render(data, row, index) : data;
                                            var content = <div className='content' style={{ display: 'inline', marginLeft: i === 0 && treeChildren.length > 0 ? '5px' : null }}>{text}</div>;
                                            return lv > 1 ?(
                                                <td key={uuidv4()} colSpan={columnsLength}  className={currentCol.className ? currentCol.className : ''} style={{
                                                    paddingLeft: i === 0 ? ((lv > 1 ? (lv * 11) : 0) + (lv > 1 ? 14 : 21) + 'px') : i === 0 && lv === 1 ? '20px' : null
                                                    }} >
                                                    {row[currentCol.data]}
                                                </td>
                                            ) :( i === 0 && treeChildren.length > 0
                                                ?
                                                <td key={uuidv4()} className={currentCol.className ? currentCol.className : ''} style={{ paddingLeft: lv > 1 ? (lv * 11 + 'px') : null }}>
                                                    <svg onClick={(e) => actionLink(e)} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" className="svg-inline--fa fa-chevron-right fa-w-10 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" icon-tree-table="icon-tree-table"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>

                                                    {content}
                                                </td>
                                                :
                                                <td key={uuidv4()} className={currentCol.className ? currentCol.className : ''} style={{
                                                    paddingLeft: i === 0 ? ((lv > 1 ? (lv * 11) : 0) + (lv > 1 ? 14 : 21) + 'px') : i === 0 && lv === 1 ? '20px' : null
                                                    }}>
                                                    {content}
                                                </td>)
                                        })
                                    }
                                </tr>
                                {
                                    treeChildren.map(function (ct) {
                                        return <Level
                                            dataLevel={row[ct]}
                                            lv={lv + 1}
                                            parentRow={index}
                                            key={uuidv4()}
                                        />
                                    })
                                }
                            </React.Fragment>
                        )
                    })
                }
            </React.Fragment>
        )
    }
    return (
        <table style={{ width: '100%' }} className='table fnu-treetable'>

            <thead>

                <tr>
                    {
                        columns.map(function (ccl, i) {
                            var title = ccl.title ? ccl.title : '';
                            var className = ccl.className ? ccl.className : '';
                            return <th key={uuidv4()} className={className} style={{paddingLeft: i === 0 ? '21px' : null}}>{title}</th>;
                        })
                    }
                </tr>

            </thead>

            <tbody>

                {
                    data.length === 0
                        ?
                        <tr>
                            <td colSpan={columnsLength} style={{ textAlign: 'center' }}>{typeof settings.empty === "string" ? settings.empty : 'NO SE ENCONTRARON REGISTROS'}</td>
                        </tr>
                        : null
                }

                <Level
                    dataLevel={data}
                    lv={1}
                />


            </tbody>

        </table>

    )
}