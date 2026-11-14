import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Message broker" (https://en.wikipedia.org/wiki/Message_broker, CC BY-SA 4.0, edited 11 April 2026).
 * Read: its list of message brokers and integration products. Technologies are offered when the page lists them as maintained (latest release 2024 or later where the page gives dates) and they are widely used; discontinued items are left out. Part of some pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app.
 */
export const messageBrokerWikipedia: SourceContribution = {
  source: 'message-broker-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Messaging and integration': {
      'Apache Kafka': 'A distributed event streaming platform.',
      'Apache ActiveMQ': 'An open-source message broker.',
      'Apache Pulsar': 'A distributed messaging and streaming platform.',
      NATS: 'A lightweight, high-performance messaging system.',
      Redpanda: 'A Kafka-compatible streaming platform.',
      'Eclipse Mosquitto': 'An open-source MQTT broker for IoT.',
      EMQX: 'A scalable MQTT broker.',
      HiveMQ: 'An enterprise MQTT broker.',
      ZeroMQ: 'A messaging library for building distributed systems.',
      'Google Cloud Pub/Sub': 'Google’s managed publish and subscribe messaging.',
      'Azure Service Bus': 'Microsoft’s managed enterprise message broker.',
      'IBM MQ': 'IBM’s enterprise messaging middleware.',
      'Solace PubSub+': 'An event broker for enterprise messaging.',
      'Apache Camel': 'An integration framework for routing and transforming messages.',
      'MuleSoft Anypoint Platform': 'An integration platform for connecting applications and APIs.',
      'WSO2 Enterprise Integrator': 'An open-source integration platform.',
    },
  },
}
