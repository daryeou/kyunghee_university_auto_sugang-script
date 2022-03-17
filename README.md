# Kyunghee-University-auto-sugang-script
경희대학교 자동 수강신청 스크립트입니다.

## How to use  
크롬에서 경희대학교 수강신청 홈페이지 로그인을 완료 후,
F12를 눌러 예시코드를 붙혀넣고 아래를 수정합니다.

    let codeList = ['GEC0100-G00', 'GEC1100-G17'];/*과목코드를 여기에 적어주세요*/
    let p_major = "A05308";/*전공 코드*/
    let p_year = "2020";/*년도*/
    let p_term = "20";/*1학기면 10 2학기면 20, 여름계절학기는 15, 겨울계절학기는 20*/

엔터를 눌러 코드를 동작시키면 좌측에 버튼이 생깁니다.
수강시간에 맞춰 버튼을 누르면 자동으로 수강신청이 완료됩니다.

## Thanks
~~None~~

## License
```
MIT License

Copyright (c) 2022 harusiku

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```



