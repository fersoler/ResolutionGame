var finish = false;
var hits   = 0;
var marked=-1;
var level  = 0;

var clauses = new Array(); // array with initial clauses
var alive   = new Array(); // array with 'alive' data

var atoms = 0;      // number of prop. variables
var nclauses = 0;   // number of initial clauses

var alertPanel = document.getElementById("alert");
var hitsPanel  = document.getElementById("hits");
var levelPanel = document.getElementById("level");
var mainPanel  = document.getElementById("clause_area");

// Cell background colors
var bgDef = "#FFFFFF";  // default
var bgHig = "#FFFF99";  // highlighted
var bgMkd = "#FFFF00";  // marked

/**************************************************************
 *                                                            *
 * PRINTING UTILITIES                                         *
 *                                                            *
 **************************************************************/

// Writing messages into panels
function panel_write(panel, message){
    panel.innerHTML=message;
}

// Prints the clauses in the main area
function print_clauses(){
    var output = "<table bgcolor='"+bgDef+"' border=1 cellspacing=0 cellpadding=2>";
    var i = 0;
    for(i=nclauses-1;i>=0;i--){
	if(alive[i]){
	    output=output+print_one_clause(i);
	}
    }
    output=output+"</table>";
    panel_write(mainPanel, output);
}

// Prints a single line
function print_one_clause(index){
    var output="";
    var i=0;
    for(i=0;i<atoms;i++){
	output=output+//"<td id=\"c"+index+"a"+i+"\">"+
	draw_cell(clauses[index].charAt(i));//+
//	    "</td>";
    }
    output="<tr id=\"c"+index+"\" onMouseOver=\"hlInClause("+index+
	")\" onMouseOut=\"hlOutClause("+index+
	")\" onclick=\"markClause("+index+")\">"+output+"</tr>";
    return output;
}

// Draws a cell
function draw_cell(cell){    
    return "<td><img src='im"+cell+".png'/></td>";
}

// Show/hide instructions text
function toggle() {
    var ele = document.getElementById("toggleText");
    var text = document.getElementById("displayText");
    if(ele.style.display == "block") {
	ele.style.display = "none";
	text.innerHTML = "Show instructions";
    }
    else {
	ele.style.display = "block";
	text.innerHTML = "Hide instructions";
    }
} 

/**************************************************************
 *                                                            *
 * EVENTS AND CHANGING LEVELS                                 *
 *                                                            *
 **************************************************************/

// Starts a level
function start_level(level){

    finish = false;
    hits   = 0;
    marked=-1;
    charge_level(level);
    panel_write(levelPanel, "Level: "+level);
    panel_write(hitsPanel, "Hits: 0");
    panel_write(alertPanel, "&nbsp;");
    i=0;
    for(i=0;i<nclauses;i++){
	alive[i]=1;
    }
    print_clauses();
    
}

// Highlights a clause
function hlInClause(trId){
    if(marked!=trId){
	document.getElementById("c"+trId).bgColor=bgHig;
    }
    return;

}
// Stops highlighting a clause
function hlOutClause(trId){
    if(marked!=trId){
	document.getElementById("c"+trId).bgColor=bgDef;
    }
    return;

}

// Marks a clause as selected
function markClause(trId){
    if(marked==-1){
	document.getElementById("c"+trId).bgColor=bgMkd;
	marked=trId;
    } else if (marked==trId) {
	document.getElementById("c"+trId).bgColor=bgDef;
	marked=-1;
    } else {
	hits++; // Increases the hits
	panel_write(hitsPanel, "Hits: "+hits);
	addResolvent(marked,trId);
	print_clauses();
	marked=-1;
	if(finish){
	    panel_write(mainPanel, "<font color='red'>You win!!</font>");
	}
    }
}

// Returns a level back
function previous_level(){
    if(level>0){
	level--;
	start_level(level);
    } else
	panel_write(alertPanel, "This is the first level");
}

// Goes to the next level
function next_level(){
    if(level<max_level()){
	level++;
	start_level(level);
    } else
	panel_write(alertPanel, "This is the last level");
}

// Restarts the current level
function restart(){
    start_level(level);
}

/**************************************************************
 *                                                            *
 * RESOLUTION CALCULUS                                        *
 *                                                            *
 **************************************************************/

// Checks if a given clause is empty
function emptyClause(clause){
    var i=0;
    for(i=0;i<clause.length;i++){
	if(clause.charAt(i) != "-") {
	    return false;
	}
    }
    return true;
}

// Returns the resolvent of two clauses or null
function resolve (c1, c2){
    var complement=0;
    var result = "";
    var i=0;    
    for(i=0;i<atoms;i++){
	if(c1[i] == "-") { 
	    result+=c2[i];
	} else if (c2[i] == "-") { 
	    result+=c1[i];
	} else if (c1[i] == c2[i]) {
	    result+=c1[i];
	} else if (complement==1) {
	    return null;
	} else {
	    complement=1;
	    result+="-";
	}
    }
    if (complement==0) {
	return null;
    }
    return result;
}

// Adds a new resolvent (if not null) to the clause set
function addResolvent (n1, n2) {
    var newClause = resolve(clauses[n1], clauses[n2]);
    if (newClause != null) {
	
	var i=0;
	for(i=0;i<nclauses;i++){ // to check subsumption by a previous one
	    if(alive[i] && subsume(clauses[i], newClause)){
		return false;
	    }
	}

	// We remove subsumed
	for(i=0;i<nclauses;i++){ 
	    if(alive[i] && subsume(newClause, clauses[i])){
		alive[i]=0; 
	    }
	}

	// we check empty clause
	if(emptyClause(newClause)){
	    finish=true;
	}

	// We add the new clause
	clauses[nclauses]=newClause;
	alive[nclauses]=1;
	nclauses++;

	return true;
	
    }
}

// Checks if the first clause subsumes the second
function subsume (small, big){
    var faltas=0;
    var i=0;
    for(i=0;i<atoms;i++){
	if(small[i]=="-") {
	    if(big[i]!="-"){
		faltas++;
	    }
	} else if (small[i] != "-") {
	    if(big[i] != small[i]){
		return false;
	    }
	}
    }
    if (faltas==0) {
	return false;
    } else { return true; }
}

