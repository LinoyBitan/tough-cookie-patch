# Tough-Cookie Vulnerability Patch

## 1. Test Suite Results

### Command Used:
To run the test suite, use the following command:
```bash
npm test
```

### Test output:
```shell

> tough-cookie@2.5.0 test
> vows test/*_test.js
> 
·································· ··········································· ······ ························ ··············· ··························································· ········································· ·✗·················································································✗✗············································································································································································································· ··············· ········ ················································································································ ······· ········ ·····


    Set/get cookie tests
      ✗ 0002
        » expected 1,
        got      0 (strictEqual) // C:\Users\Linoy Bitan\Desktop\tough-cookie-patch\node_modules\vows\lib\assert\macros.js:14

      ✗ COMMA0006
        » expected 1,
        got      0 (strictEqual) // C:\Users\Linoy Bitan\Desktop\tough-cookie-patch\node_modules\vows\lib\assert\macros.js:14

      ✗ COMMA0007
        » expected 1,
        got      0 (strictEqual) // C:\Users\Linoy Bitan\Desktop\tough-cookie-patch\node_modules\vows\lib\assert\macros.js:14
  ✗ Broken » 664 honored ∙ 3 broken (8.292s)
  ```