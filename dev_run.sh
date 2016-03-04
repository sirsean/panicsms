./compile.sh
docker build -t panicsms .
docker stop panicsms
docker rm panicsms
docker rmi $(docker images -q -f dangling=true)
docker run \
    -p 9111:80 \
    -e TWILIO_ACCOUNT_SID \
    -e TWILIO_AUTH_TOKEN \
    -e TWILIO_FROM \
    --name panicsms \
    -d \
    panicsms
docker logs -f --tail=20 panicsms
