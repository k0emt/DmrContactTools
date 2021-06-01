# 4 States QRP

Instructions on creating an operator list for 4 States QRP group

```sh
curl http://www.4sqrp.com/w25.php | grep qrz.com/db | sed -e "s/^.*ShowBig('http:\/\/www.qrz.com\/db\///" -e "s/'.*$//" -e "s/ //g" > 4SQRP-ops.txt
```
