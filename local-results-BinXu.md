## Express
```
$ docker run --rm williamyeh/wrk -c20 -d30 -t12 http://192.168.56.101:3000/users
Running 30s test @ http://192.168.56.101:3000/users
  12 threads and 20 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     9.04ms   12.73ms  75.30ms   86.58%
    Req/Sec   166.80     47.47   343.00     71.44%
  59897 requests in 30.10s, 18.72MB read
Requests/sec:   1990.09
Transfer/sec:    637.03KB
```

## Restify
```
Running 30s test @ http://192.168.56.101:3000/users
  12 threads and 20 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     9.36ms   13.15ms 105.19ms   86.71%
    Req/Sec   159.43     50.20   330.00     68.13%
  57303 requests in 30.10s, 14.39MB read
Requests/sec:   1903.78
Transfer/sec:    489.41KB
```

## Fastify
```
Running 30s test @ http://192.168.56.101:3000/users
  12 threads and 20 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     7.68ms   11.57ms  73.11ms   87.28%
    Req/Sec   210.60     60.49   410.00     69.20%
  75642 requests in 30.09s, 18.97MB read
Requests/sec:   2514.16
Transfer/sec:    645.65KB
```

## Zend (current PHP API Box)
$ docker run --rm williamyeh/wrk -c20 -d30 -t12 https://192.168.56.101/v1/benchmark
Running 30s test @ https://192.168.56.101/v1/benchmark
  12 threads and 20 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     0.00us    0.00us   0.00us    -nan%
    Req/Sec     0.00      0.00     0.00    100.00%
  63 requests in 30.09s, 33.72KB read
  Socket errors: connect 0, read 0, write 0, timeout 63
Requests/sec:      2.09
Transfer/sec:      1.12KB