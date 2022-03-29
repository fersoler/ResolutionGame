function max_level(){
    return 6;
}

function charge_level(level){

    switch(level)
    {	
    case 0:
	atoms = 1;
	nclauses = 2;
	clauses[0] = "0";
	clauses[1] = "1";
	break;
    case 1:
	atoms = 3; 
	nclauses = 4;  
	clauses[0] = "111";
	clauses[1] = "-0-";
	clauses[2] = "0--";  
	clauses[3] = "--0";
	break;
    case 2: 
	atoms = 2; 
	nclauses = 4;  
	clauses[0] = "01";
	clauses[1] = "10";
	clauses[2] = "00";  
	clauses[3] = "11";
	break;
    case 3:
	atoms = 3;
	nclauses = 8;
	clauses[0] = "000";
	clauses[1] = "100";
	clauses[2] = "110";
	clauses[3] = "011";
	clauses[4] = "010";
	clauses[5] = "101";
	clauses[6] = "001";
	clauses[7] = "111";
	break;
    case 4:		
	atoms=5;
	nclauses=6;
	clauses[0] = "10-1-";
	clauses[1] = "1-1-0";
	clauses[2] = "0---1";
	clauses[3] = "----0";
	clauses[4] = "-1-1-";
	clauses[5] = "---0-";
	break;	
    case 5:
	atoms=6;
	nclauses=24;
	clauses[0] = "-11---";
	clauses[1] = "1-1---";
	clauses[2] = "11----";
	clauses[3] = "---11-";
	clauses[4] = "1---1-";
	clauses[5] = "1--1--";
	clauses[6] = "----11";
	clauses[7] = "-1---1";
	clauses[8] = "-1-1--";
	clauses[9] = "----11";
	clauses[10] = "--1--1";
	clauses[11] = "--1-1-";
	clauses[12] = "00----";
	clauses[13] = "0-0---";
	clauses[14] = "0--0--";
	clauses[15] = "0---0-";
	clauses[16] = "-00---";
	clauses[17] = "-0-0--";
	clauses[18] = "-0---0";
	clauses[19] = "--0-0-";
	clauses[20] = "--0--0";
	clauses[21] = "---00-";
	clauses[22] = "---0-0";
	clauses[23] = "----00";
	break;
    case 6:
	atoms=16;
	nclauses=19;
	clauses[0]  = "11--------------";
	clauses[1]  = "-----10---------";
	clauses[2]  = "-0-0------------";
	clauses[3]  = "------1--------0";
	clauses[4]  = "-------------10-";
	clauses[5]  = "-----11---------";
	clauses[6]  = "----------11----";
	clauses[7]  = "---00-----------";
	clauses[8]  = "---------1-1----";
	clauses[9]  = "----10----------";
	clauses[10] = "-------10-------";
	clauses[11] = "-------0-----0--";
	clauses[12] = "--------11------";
	clauses[13] = "------------11--";
	clauses[14] = "--------10------";
	clauses[15] = "---------00-----";
	clauses[16] = "--11------------";
	clauses[17] = "-----0--0-------";
	clauses[18] = "--------------11";
	break;
    }

}
