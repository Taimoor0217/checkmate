#include <iostream>
#include <string> 
using namespace std;
void split(int x , string v){
	// int a , b ;
	string a = "";
	int b = 0;
	int LEN = v.length();
	for(int i = 0 ; i < LEN  ; i++){
		if(v[i] != '4'){
			a = a+v[i];
		}else{
			a = a+'3';
			int c = 1;
			int diff = (LEN-1) - i ;
			if(diff){
					while(diff){
					c *= 10;
					diff--;
				}
				b += (c);
			}else{
				b += 1;
			}

		}
	}
	cout <<"Case #" << x <<": "<< a <<" "<< b<< endl;

}
int main(){
	int N;
	cin >> N;
	for(int i = 1 ; i < N+1 ; i++){
		int V;
		cin >> V;
		split(i , to_string(V));
	}	
}